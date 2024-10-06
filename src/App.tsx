import {Route, Routes} from "react-router-dom";
import {AuthLayout, RootLayout} from "./layouts";
import {NotFound} from "./pages";
import {AuthChecker} from "./middlewares";
import {Crypto, Games, Movies, Tasks, Users} from "@/pages";

function App() {
    return (
        <Routes>
            {/* Root layout */}
            <Route
                element={
                    <AuthChecker>
                        <RootLayout/>
                    </AuthChecker>
                }
            >
                <Route index element={<Users/>}/>
                <Route path="tasks" element={<Tasks/>}/>
                <Route path="games" element={<Games/>}/>
                <Route path="crypto" element={<Crypto/>}/>
                <Route path="movies" element={<Movies/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Route>

            {/* Auth layout */}
            <Route path="/auth" element={<AuthLayout/>}/>
        </Routes>
    );
}

export default App;
