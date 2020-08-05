import { customValidator } from "../../utils/validators";

export const validator = values => {
    const errors = {};
    errors["name"] = customValidator.required(values["name"]);
    errors["village"] = customValidator.required(values["village"]);
    errors["tehsil"] = customValidator.required(values["tehsil"]);
    errors["mobile"] = customValidator.required(values["mobile"]);
    return errors;
};
