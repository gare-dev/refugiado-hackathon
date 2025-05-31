import Sidebar from "@/components/Sidebar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/main.module.scss"
import { falar } from "@/utils/falar";
import options from '@/utils/options'; // ou de onde salvar // IMPORTA AQUI
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/Map"), {
    ssr: false, // desabilita a renderização do lado servidor para este componente
});



// Componentes das telas


export default function Main() {
    const { t, i18n } = useTranslation("common");
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<string>("Início");
    const [falaAtiva, setFalaAtiva] = useState(false); // switch ativado por padrão


    const HomeScreen = () => (
        <div className={styles.divHome}>
            <div>
                <h1 onMouseOver={() => {
                    if (falaAtiva) falar(t("home.title"), i18n.language);
                }} className={styles.titleHome}>{t("home.title")}</h1>
            </div>
            <div className={styles.flagContainer}>
                <img
                    onMouseOver={() => {
                        if (falaAtiva) falar(t("home.brasil"), i18n.language);
                    }} onClick={() => i18n.changeLanguage("pt")} src="/assets/img/brasil.jpg" alt="Português - Brasil" />
                <img
                    onMouseOver={() => {
                        if (falaAtiva) falar(t("home.espanha"), i18n.language);
                    }} onClick={() => i18n.changeLanguage("es")} src="/assets/img/espanha.png" alt="Espanhol - Espanha" />
            </div>
            <div>
                <label
                    className={styles.falarMouse}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                        type="checkbox"
                        checked={falaAtiva}
                        onChange={() => setFalaAtiva(!falaAtiva)}
                        className={styles.switch}
                    />
                    <span onMouseOver={() => {
                        if (falaAtiva) falar(t("home.speaklabel"), i18n.language);
                    }}>{t("home.speaklabel")}</span>
                </label>
            </div>
            <div style={{ width: "600px" }}>
                <label className={styles.texto} htmlFor="">{t("home.texto")}</label>
            </div>
        </div>
    );
    const ServicesScreen = () => (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 250,
            height: "100%"
        }}>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                maxWidth: '900px',
                margin: '0 auto',
            }}>
                {options.map(({ key, icon: Icon, url }) => (
                    <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textAlign: 'center',
                            padding: '1rem',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: '#333',
                            transition: 'box-shadow 0.2s',

                        }}
                        onMouseOver={e => {
                            (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)');
                            if (falaAtiva) falar(t(`services.${key}`), i18n.language);
                        }}
                        onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}

                    >
                        <Icon size={48} style={{ marginBottom: '0.5rem', color: '#171446' }} />
                        <div className={styles.textobox}>{t(`services.${key}`)}</div>
                    </a>
                ))}
            </div>
        </div>

    );

    const MapScreen = () => (
        <>
            <div className={styles.titlemap} style={{ display: "flex", justifyContent: "center", paddingLeft: 250 }}>
                <h2 onMouseOver={() => { if (falaAtiva) falar(t(`mapa.locais`), i18n.language); }}>{t("mapa.locais")}</h2>
            </div>
            <MapComponent />

        </>
    );
    const TranslatorScreen = () => {
        const [text, setText] = useState("");

        const handleSpeak = () => {
            if (!text) return;

            // Cancela fala anterior, se houver
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = i18n.language || "pt-BR";
            window.speechSynthesis.speak(utterance);
        };

        return (
            <div style={{ paddingLeft: 250, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <div>
                        <h2 onMouseOver={() => { if (falaAtiva) falar(t(`translate.title`), i18n.language); }} className={styles.titletrans}>{t("translate.title")}</h2>
                    </div>
                    <div>
                        <p className={styles.explanation}>
                            {t("translate.exp")}
                        </p>
                    </div>
                    <textarea
                        rows={5}
                        cols={50}
                        value={text}
                        onMouseOver={() => { if (falaAtiva) falar(t(`translate.ph`), i18n.language); }}
                        className={styles.textarea}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={t("translate.ph")}
                        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
                    />
                    <br />
                    <button onMouseOver={() => { if (falaAtiva) falar(t(`translate.btt`), i18n.language); }} onClick={handleSpeak} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
                        {t("translate.btt")}
                    </button>
                </div>
            </div>

        );
    };

    useEffect(() => {
        console.log(selectedItem)
    }, [selectedItem])

    useEffect(() => {
        const lang = i18n.language;
        if (lang && lang !== router.locale) {
            i18n.changeLanguage(lang);
            router.push(router.pathname, router.asPath, { locale: lang });
        }
    }, [i18n.language]);

    // Renderiza a tela conforme o item selecionado
    const renderContent = () => {
        switch (selectedItem) {
            case "Início":
                return <HomeScreen />;
            case "Serviços":
                return <ServicesScreen />;
            case "Mapa":
                return <MapScreen />;
            case "Falar Texto":
                return <TranslatorScreen />;
            default:
                return <h2>👈 Selecione uma opção no menu lateral</h2>;
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar falaAtiva={falaAtiva} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <main style={{ flex: 1, padding: "2rem" }}>
                {renderContent()}
            </main>
        </div>
    );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});
