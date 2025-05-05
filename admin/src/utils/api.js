// import axios from 'axios';




// export const fetchDataFromApi=async(url)=>{
//     try{
//         const {data}=await axios.get("http://localhost:4000"+url)
//         return data;
//     }catch(error){
//         console.log(error);
//         return error;
//     }
// }

// export const postData= async (url,formData)=>{

       
//     try{
//       const response=await fetch("http://localhost:4000" + url,{
//         method:'POST',
//         headers:{
//           'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(formData)
//       });
      
//       if(response.ok){
//         const data=await response.json();
//         return data;
//       }else{
//         const errorData= await response.json();
//         return errorData;
//       }
//     }catch(error){
//       console.log(error)
//     }
//   }
    


// export const editData = async (url , updatedData)=>{
//   const {res} =await axios.put(`http://localhost:4000${url}`,updatedData)
//   return res;
// }

// export const deleteData= async(url)=>{
//     const {res }= await axios.delete(`http://localhost:4000${url}`)
//     return res;
// }
// // export const deleteImages= async (url,image)=>{
// //     const {res} = await axios.delete(`http://localhost:4000${url}`,image)
// //     return res;
// // }
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

export const fetchDataFromApi = async(url) => {
    try {
        const {data} = await axios.get("http://localhost:4000" + url, getAuthHeaders())
        return data;
    } catch(error) {
        console.log(error);
        return error;
    }
}

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

export const editData = async (url, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:4000${url}`, updatedData, getAuthHeaders());
        return response.data;
    } catch(error) {
        console.log(error);
        return error;
    }
}

export const deleteData = async(url) => {
    try {
        const response = await axios.delete(`http://localhost:4000${url}`, getAuthHeaders());
        return response.data;
    } catch(error) {
        console.log(error);
        return error;
    }
}

export const deleteImages = async (url, imageData) => {
    try {
        const response = await axios.delete(`http://localhost:4000${url}`, {
            ...getAuthHeaders(),
            data: imageData, // Send data in the request body for DELETE
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting image:", error);
        return error;
    }
}