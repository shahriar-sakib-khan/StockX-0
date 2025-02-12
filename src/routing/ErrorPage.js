import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return(
    <>
      <h2>Oops...</h2>
      <p>
        {isRouteErrorResponse(error)
        ? "Invalid page link"
        : "Sorry, an unexpected error has occured"
        }
      </p>
    </>
  )
}

export default ErrorPage;