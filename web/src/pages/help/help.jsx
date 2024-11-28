import { Main, Section } from "../users/usersStyle";
import { Side } from "../../components/Side/side";
import { Header } from "../../components/Header/Header";
import { FAQ } from "../../components/FAQ/FAQ";

export function Help() {
    const userType = localStorage.getItem("userType");

    return (
        <Main>
            <Side />
            <Section>
                <Header title="FAQ" />
                <Section>
                    <FAQ userType={userType} />
                </Section>
            </Section>
        </Main>
    );
}
