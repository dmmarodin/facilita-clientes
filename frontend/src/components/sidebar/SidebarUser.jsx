import { useUserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function SidebarUser() {
    const user = useUserContext();
    return (
        <div
            className="user"
            onClick={() => toast.error("Ainda não implementado!")}
        >
            <Avatar size={35} />
            <div>
                <div className="user-name">{user.nome}</div>
                <div className="user-role">{user.role}</div>
            </div>
            <FontAwesomeIcon className="chevron" icon={faChevronDown} />
        </div>
    );
}
