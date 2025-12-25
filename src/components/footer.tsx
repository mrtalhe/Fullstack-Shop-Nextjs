import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="bg-gray-700 w-full text-white py-10 mt-auto ">
      <div className="container justify-center text-center items-center">
        <div className="row">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-xl">Address</h2>
              <p>123 Main Street, Anytown, USA</p>
            </div>
            <div>
              <h2 className="text-xl">Contact us</h2>
              <p>Phone: +98 915 470 4042 </p>
            </div>
            <div>
              <h2 className="text-xl">quick links</h2>
              <div className="flex flex-col">
                <Link className="hover:text-blue-500" href="/">
                  Home
                </Link>
                <Link className="hover:text-blue-500" href="/products">
                  Products
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl">Follow us</h2>
              <div className="flex flex-col">
                <Link className="hover:text-blue-500" href="/">
                  Facebook
                </Link>
                <Link className="hover:text-blue-500" href="/">
                  Twitter
                </Link>
                <Link className="hover:text-blue-500" href="/">
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="justify-center text-xl mt-32 ">
          &copy;Design and Develop With TalheTech
        </p>
      </div>
    </footer>
  );
};

export default Footer;
