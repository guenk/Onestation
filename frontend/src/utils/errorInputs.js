export const validateInputs = ({ pseudo, password }) => {
  let errors = {};
  
  if (pseudo && pseudo.length < 5) {
    errors.pseudo = "Le pseudo doit contenir au moins 5 caractères.";
  }

  if (
    password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&*()_+]{10,32}$/.test(
      password
    )
  ) {
    errors.password =
      "Le mot de passe doit être compris entre 10 et 32 caractères et comprendre des majuscules, minuscules et des chiffres. Les caractères spéciaux sont autorisés.";
  }

  return errors;
};
