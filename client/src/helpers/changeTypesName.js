export const changeTypesName = (type) => {
  const location = window.location.pathname;
  const path = location.split("/");

  switch (path[1]) {
    case "":
      return type;
    case "post":
      return `SINGLE_${type}`;
    case "likes":
      return `FAVORITE_${type}`;
    case "profile":
      return `PROFILE_${type}`  
    case "addPost":
      return type  
    default:
      return type;
  }
};
