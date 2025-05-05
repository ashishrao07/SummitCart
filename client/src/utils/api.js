import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  console.log("Token from localStorage:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};


export const fetchDataFromApi=async(url)=>{
  try{
      const{data}=await axios.get("http://localhost:4000"+url,getAuthHeaders())
      return data;
  }catch(error){
      console.log(error);
      return error;
  }
}

// export const postData= async (url,formData)=>{
//   try{
//       const { res } =await axios.post("http://localhost:4000" + url, formData)
//   return res.data;
//   }catch(error){
//       console.log(error);
//   }
  
// }
export const postData = async (url, formData) => {
  try {
      const response = await axios.post("http://localhost:4000" + url, formData, getAuthHeaders());
      return response.data;
  } catch(error) {
      if (error.response && error.response.data) {
          return error.response.data;
      } else {
          return { status: false, msg: "Something went wrong" };
      }
  }
}

export const editData = async (url , updatedData)=>{
const {res} =await axios.put(`http://localhost:4000${url}`,updatedData,getAuthHeaders())
return res;
}

export const deleteData= async(url)=>{
  const {res} = await axios.delete(`http://localhost:4000${url}`,getAuthHeaders())
  return res;
}

// export const deleteImages= async (url,image)=>{
//     const {res} = await axios.delete(`${process.env.REACT_APP_BASE_URL}`,image)
//     return res;
// }
// export const deleteImages = async (url, imageData) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000${url}`, {
//         data: imageData, // Send data in the request body for DELETE
//       })
//       return response.data
//     } catch (error) {
//       console.error("Error deleting image:", error)
//       return error
//     }
//   }