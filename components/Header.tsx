export default function Header() {
  return (
    <header className="site"><div className="wrap">
  <a href="/" aria-label="Easy Rx Cycle home"><img className="logo" src="/images/logo-full.png" alt="Easy Rx Cycle" /></a>
  <nav className="main">
    <a href="#solutions">Solutions</a>
    <a href="#industries">Who We Serve</a>
    <a href="#how">How It Works</a>
    <a href="#why">Why Us</a>
    <a href="#partners">Partners</a>
  </nav>
  <div className="hactions">
    <a className="shoplink" href="#">Shop</a>
    <a className="btn btn-primary" href="#">Get a quote <span className="ar">&rarr;</span></a>
  </div>
</div></header>
  );
}
