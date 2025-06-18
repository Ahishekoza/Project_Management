import { House, Layers, Users } from "@deemlol/next-icons";

export const authNavgations = [
    {
        link: "/dashboard",
        icon: (props) => <House  {...props} />,
        name: "Dashboard"
    },
    {
        link: "/clients",
        icon: (props) => <Users  {...props} />,
        name: "Clients"
    },
    {
        link: "/projects",
        icon: (props) => <Layers  {...props} />,
        name: "Projects"
    }
]
