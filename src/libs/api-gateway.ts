type StatusCode = 200 | 201 | 401 | 404 | 500;

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: StatusCode = 200
) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
