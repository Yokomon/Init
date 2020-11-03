const signin = async (user) => {
  try {
    let response = await fetch("/auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const signout = async (signal) => {
  try {
    let response = await fetch("/auth/signout", {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { signin, signout };
