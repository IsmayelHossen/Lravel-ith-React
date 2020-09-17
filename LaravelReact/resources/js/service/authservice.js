import Axios from "axios";
export const checkIfAuthenticated1 = () => {
    const getLoginData = localStorage.getItem("loginData");
    // console.log('getLoginData', getLoginData);
    if (getLoginData != null) {
        const data = JSON.parse(getLoginData);
        if (data.success) {
            return data.user;
        }
        return false;
    }
    return false;
};

export const storeRegistration = async (data) => {
    return await Axios.post("http://localhost:8000/api/register", data).then((res) => {
        return res.data;

    });
};

export const loginUser = async (data) => {

    return await Axios.post("api/login", data).then((res) => {
        return res.data;

    });
};
