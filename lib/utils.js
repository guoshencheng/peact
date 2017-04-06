/**
 * Created by guoshencheng on 27/03/2017.
 */
export const compareType = (type1, type2) => {
  if (type1 === type2) {
    return true;
  } else {
    return typeof type1 !== "string" && typeof type2 !== "string" && type1.name === type2.name;
  }
}


