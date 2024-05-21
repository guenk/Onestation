import { useRef, useEffect, useState } from "react";
import './style.scss';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Canva = ({socket, roomID}) => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('#000000');
  const linesRef = useRef(lines);

  useEffect(() => {
    console.log(color);
  }, [color])

  useEffect(() => {
    linesRef.current = lines; // Add this line
  }, [lines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let drawing = false;
    let current = { x: 0, y: 0 };

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      const line = { x0: x0 / w, y0: y0 / h, x1: x1 / w, y1: y1 / h, color };
      setLines(lines => [...lines, line]);

      socket.emit('drawing', {
        roomID,
        data: line,
      });
    };

    const onMouseDown = (e) => {
      drawing = true;
      current.x = (e.clientX || e.touches[0].clientX) - canvas.getBoundingClientRect().left + window.scrollX;
      current.y = (e.clientY || e.touches[0].clientY) - canvas.getBoundingClientRect().top + window.scrollY;
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      const newX = (e.clientX || e.touches[0].clientX) - canvas.getBoundingClientRect().left + window.scrollX;
      const newY = (e.clientY || e.touches[0].clientY) - canvas.getBoundingClientRect().top + window.scrollY;
      drawLine(current.x, current.y, newX, newY, color, true);
      current.x = newX;
      current.y = newY;
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;

      const newX = (e.clientX || e.touches[0].clientX) - canvas.getBoundingClientRect().left + window.scrollX;
      const newY = (e.clientY || e.touches[0].clientY) - canvas.getBoundingClientRect().top + window.scrollY;

      drawLine(current.x, current.y, newX, newY, color, true);
    };

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function() {
        const time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    // const onUndo = () => {
    //   setLines(lines => lines.slice(0, -1));
    //   redrawLines();
    // }

    const redrawLines = () => {
      const w = canvas.width;
      const h = canvas.height;
      for (let line of linesRef.current) {
        drawLine(line.x0 * w, line.y0 * h, line.x1 * w, line.y1 * h, line.color);
      }
    };

    let resizeTimeout;
    const onResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        redrawLines();
      }, 100);
    };

    window.addEventListener('resize', onResize, false);

    const onDrawingEvent = ({ data }) => {
      const w = canvas.width;
      const h = canvas.height;

      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);

      const line = { x0: data.x0, y0: data.y0, x1: data.x1, y1: data.y1, color: data.color };
      setLines(lines => [...lines, line]);
    }

    socket.on('drew', onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div className="border rounded-xl bg-slate-100">
      <div>
        <canvas ref={canvasRef} className="canva" />
      </div>
    </div>
  );
};

export default Canva;