import { AppError } from "../types/ErrorTypes";

type ErrorMessageProps = {
  message: AppError;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p>Error! {message}</p>;
};
