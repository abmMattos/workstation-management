import { Main, Section } from "../users/usersStyle";
import { Side } from "../../components/Side/side";
import { Header } from "../../components/Header/Header";
import { FAQ } from "../../components/FAQ/FAQ";

export function Help() {

    return (
        <Main>
            <Side />
            <Section>
                <Header title="FAQ" />
                <Section>
                    <FAQ />
                </Section>
            </Section>
        </Main>
    );
}
