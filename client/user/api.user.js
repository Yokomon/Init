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

const create = async (user) => {
  try {
    let response = await fetch("/api/users", {
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

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(`/api/user/${params.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      signal,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(`/api/user/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: user,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(`/api/user/${params.userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { list, create, read, update, remove };
