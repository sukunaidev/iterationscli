import { Button } from "../ui/button";


function Hero() {
    return (

        <div className="">
            <div className="bg-black h-screen flex items-center justify-center">
                <div className="flex items-center flex-col ">
                    <div className="flex-col items-center">
                        <div>
                            <h1
                                className="text-5xl -mt-30">{">IterationsCLI|"}</h1>
                        </div>
                    </div>
                    <div className="flex gap-4 ">
                        <Button className="">Features</Button>
                        <Button className=" ">Get Started</Button></div>


                    <div className="text-gray-500 mt-10">Click Get Started or CTRL + Y to open the command window.</div>
                </div>

            </div>


        </div>

    );
}
export default Hero