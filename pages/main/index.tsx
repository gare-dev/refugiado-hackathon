import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Main() {
    const { t, i18n } = useTranslation('common');
    const [lang] = useState(i18n.language)
    const router = useRouter()

    useEffect(() => {
        console.log(i18n.languages)
    }, [i18n.language])


    useEffect(() => {
        if (lang && lang !== router.locale) {
            i18n.changeLanguage(lang);
            router.push(router.pathname, router.asPath, { locale: lang });
        }
    }, [lang]);

    return (
        <div>
            <h2 onMouseOver={() => {

            }}>{t("teste.teste")}</h2>
        </div>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});
