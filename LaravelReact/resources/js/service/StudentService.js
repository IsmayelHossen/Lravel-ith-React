import Axios from "axios";

export const storeData = async (data) => {

    return await Axios.post("http://localhost:8000/api/Student", data).then((res) => {
        return res.data;

    });
};
export const deleteStudent = async (id) => {

    return await Axios.delete(`http://localhost:8000/api/Student/${id}`).then((res) => {
        return res.data;

    });
};
export const updateData = async (id, data) => {
    data.user_id = 1;
    console.log('data', data);
    return await Axios.put(`http://localhost:8000/api/Student/${id}`, data).then((res) => {
        return res.data;

    });
};
