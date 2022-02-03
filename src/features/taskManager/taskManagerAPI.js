export function getTodoListFromAPI() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: [
            {
              id: 2,
              name: "Go to a market.",
            },
            {
              id: 3,
              name: "Do laundry",
            },
          ],
        }),
      1000
    )
  );
}

export function getCompleteListFromAPI() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: [
            {
              id: 1,
              name: "Clean up room.",
            },
          ],
        }),
      1000
    )
  );
}
