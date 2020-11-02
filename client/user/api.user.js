const list = async (signal) => {
  try {
    let response = await fetch("/api/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { list };
