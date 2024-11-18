import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { DefaultComponent } from "./components/Default/DefaultComponent";
import axios from "axios";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/user/userSlice";
import * as UserService from "./services/UserService";
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_Token");

    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }

    return { decoded, storageData };
  };
  useEffect(() => {
    setIsLoading(true);
    let { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false)
  },[]);
  const handleGetDetailsUser = async (id, token) => {
    setIsLoading(true); // Chuyển trạng thái loading vào đây
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_Token: token }));
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    } finally {
      setIsLoading(false); // Đảm bảo loading được đặt thành false sau khi hoàn tất
    }
  };

  UserService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      let { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_Token}`;
        // Cập nhật mã thông báo mới vào localStorage
        localStorage.setItem("access_Token", JSON.stringify(data.access_Token));
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // console.log('url',process.env.REACT_API_URL)
  // useEffect(()=>{
  //   fetchApi()
  // })

  // const fetchApi=async()=>{
  //   const res=await axios.get(`http://localhost:3001/api/product/get-all`)
  //   console.log('res',res)
  // }
  return (
    <div>
      <LoadingComponent isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={isCheckAuth ? route.path : "not found"}
                  element={
                    <div>
                      <Layout>
                        <Page />
                      </Layout>
                    </div>
                  }
                ></Route>
              );
            })}
          </Routes>
        </Router>
      </LoadingComponent>
    </div>
  );
}

export default App;
