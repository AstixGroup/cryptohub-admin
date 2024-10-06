import {FiUsers} from "react-icons/fi";
import {MdAddTask, MdCurrencyExchange} from "react-icons/md";
import {SlGameController} from "react-icons/sl";
import {RiMovie2Line} from "react-icons/ri";


export const sidebarItems = [
    // {
    //     id: 1,
    //     label: "Dashboard",
    //     href: "/",
    //     icon: <AiOutlineDashboard/>,
    // },
    {
        id: 1,
        label: "Users",
        href: "/",
        icon: <FiUsers/>,
    },
    {
        id: 3,
        label: "Tasks",
        href: "/tasks",
        icon: <MdAddTask/>,
    },
    {
        id: 4,
        label: "Games",
        href: "/games",
        icon: <SlGameController/>,
    },
    {
        id: 5,
        label: "Crypto",
        href: "/crypto",
        icon: <MdCurrencyExchange/>,
    },
    {
        id: 6,
        label: "Movies",
        href: "/movies",
        icon: <RiMovie2Line/>,
    },
];

export const socialMediaPlatforms = ["TWITTER", "INSTAGRAM", "FACEBOOK", "YOUTUBE", "TELEGRAM"];
