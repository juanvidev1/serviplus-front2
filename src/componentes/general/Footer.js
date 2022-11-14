import Imagenes from "../../assets/img/imagenes";

const Footer = () => {


    return(
    <div className="m-0">

        <footer className="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
        <div className="container pt-4">
            <section className="mb-4 d-flex flex-row">
            <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark">
                <img className="img-fluid" src={Imagenes.facebook} alt="" width={"15%"} height={"15%"}></img></a>

            <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark">
                <img className="img-fluid" src={Imagenes.twitter} alt="" width={"15%"} height={"35%"}></img></a>

            <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark">
                <img className="img-fluid" src={Imagenes.google} alt="" width={"15%"} height={"35%"}></img></a>


            <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark">
                <img className="img-fluid" src={Imagenes.instagram} alt="" width={"15%"} height={"35%"}></img></a>

            <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark">
                <img className="img-fluid" src={Imagenes.linkedin} alt="" width={"10%"} height={"40%"}></img></a>
            
            <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark">
                <img className="img-fluid" src={Imagenes.github} alt="" width={"30%"} height={"30%"}></img></a>
            </section>
        </div>

        <div className="text-center text-dark p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
            © 2022 Copyright: ServiPLus
        </div>
        </footer>
        
    </div>
    );
}

export default Footer;