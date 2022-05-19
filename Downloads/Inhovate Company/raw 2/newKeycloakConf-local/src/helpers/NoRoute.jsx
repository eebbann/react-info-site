import React from 'react';
import './noRoute.css';

const NoRoute = () => {
    return (
        <div className="noRouteContainer">
           <div class='error'>
             <h1 class='code'>404</h1>
             <h2 class='desc'>Oops... Page not found</h2>
           </div>
           <a href="/"><input type="button" className="button404" value="BACK TO HOME" /></a>
           <footer>
             <p>© 2022 inHovate Solutions Ltd</p>
           </footer>
       </div>
        
    )
}

export default NoRoute