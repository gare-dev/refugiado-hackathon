import { useTranslation } from 'next-i18next';
import {
    MdHome,
    MdWork,
    MdSchool,
    MdLocalHospital,
    MdGavel,
    MdHelpOutline,
    MdHowToReg,
    MdDescription,
    MdLibraryBooks,
    MdPublic,
} from 'react-icons/md';
// const { t } = useTranslation("common");

const options = [
    {
        key: "moradia",
        icon: MdHome,
        url: "https://help.unhcr.org/brazil/moradia-e-abrigamento/",
    },
    {
        key: "trabalho",
        icon: MdWork,
        url: "https://help.unhcr.org/brazil/trabalho-e-renda/",
    },
    {
        key: "educacao",
        icon: MdSchool,
        url: "https://help.unhcr.org/brazil/educacao/",
    },
    {
        key: "saude",
        icon: MdLocalHospital,
        url: "https://help.unhcr.org/brazil/saude/",
    },
    {
        key: "direitos",
        icon: MdGavel,
        url: "https://help.unhcr.org/brazil/direitos-e-deveres/",
    },
    {
        key: "ajuda",
        icon: MdHelpOutline,
        url: "https://help.unhcr.org/brazil/onde-encontrar-ajuda/",
    },

    {
        key: "apatridia",
        icon: MdPublic,
        url: "https://help.unhcr.org/brazil/apatridia/",
    },

    {
        key: "documentos",
        icon: MdDescription,
        url: "https://help.unhcr.org/brazil/documentos/",
    },
    {
        key: "materiais",
        icon: MdLibraryBooks,
        url: "https://help.unhcr.org/brazil/materiais-informativos/",
    },
    {
        key: "solicitacao",
        icon: MdHowToReg,
        url: "https://help.unhcr.org/brazil/solicitacao-da-condicao-de-refugiado/",
    },
];

export default options;



