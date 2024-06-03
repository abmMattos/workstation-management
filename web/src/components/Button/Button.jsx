import { Button } from "./Button"

function Button() {
    console.log("chamou");
}

export function HomeButton() {
    return(
        <Button onClick={Button()}>
        </Button>
    )
}