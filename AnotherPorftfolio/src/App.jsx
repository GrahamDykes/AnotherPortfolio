import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    let tick = 0;
    let particles = [];
    let maxRadius = Math.sqrt((w * w) / 4 + (h * h) / 4);

    ctx.font = "12px monospace";

    function Particle() {
      this.reset();
    }
    Particle.prototype.reset = function () {
      this.radian = Math.random() * Math.PI * 2;
      this.radius = 0;
      this.angSpeed = 0.05;
      this.incSpeed = 5;
      this.x = this.y = 0;
    };
    Particle.prototype.step = function () {
      const prevX = this.x,
        prevY = this.y;

      this.radian += this.angSpeed;
      this.radius += this.incSpeed;

      this.x = this.radius * Math.cos(this.radian);
      this.y = this.radius * Math.sin(this.radian);

      const dx = this.x - prevX,
        dy = this.y - prevY,
        len = Math.sqrt(dx * dx + dy * dy);

      for (let i = 0; i <= len; i += 10) {
        const y = prevY + (dy * i) / len,
          x = prevX + (dx * i) / len;

        const posX = ((x / 10) | 0) * 10,
          posY = ((y / 10) | 0) * 10;

        ctx.fillStyle = "#080808";
        ctx.fillRect(w / 2 + posX, h / 2 + posY - 9, 10, 10);
        ctx.fillStyle = `hsl(${
          (posX / w) * 240 + (posY / h) * 240 + tick
        }, 80%, 50%)`;
        ctx.fillText(Math.random() < 0.5 ? 0 : 1, w / 2 + posX, h / 2 + posY);
      }

      if (this.radius >= maxRadius) this.reset();
    };

    function anim() {
      requestAnimationFrame(anim);

      ++tick;

      ctx.fillStyle = "rgba(20,20,20,.04)";
      ctx.fillRect(0, 0, w, h);

      if (particles.length < 100 && Math.random() < 0.3) {
        particles.push(new Particle());
      }

      particles.forEach((particle) => {
        particle.step();
      });
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    anim();

    const handleResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      ctx.font = "12px monospace";
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      maxRadius = Math.sqrt((w * w) / 4 + (h * h) / 4);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="hamburger" onClick={toggleMenu}>
          ☰HAMBURGER
        </div>
        <ul className={menuOpen ? "active" : ""}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Use ref on canvas */}
      <canvas ref={canvasRef} id="c"></canvas>

      <section id="home" className="home-section">
        <div className="home-text">
          <h1>Prepare to be amazed!</h1>
        </div>
      </section>

      <section id="about" className="section">
        <h1>About</h1>
      </section>

      <section id="projects" className="section">
        <h1>Projects</h1>
      </section>

      <section id="contact" className="section">
        <h1>Contact</h1>
      </section>
    </div>
  );
}

export default App;
