import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <h2> Error 404: Page Not Found </h2>
            <nav>
                <Link to="/"><h2>Översikt</h2></Link>
            </nav>
        </>

    )
}
export default Error;