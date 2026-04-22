import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card } from "../ui/card";

const features_content: FeatureItemProps[] = [
  {
    title: "Feature 1",
    sub_text: "One reason for picking us",
    video_src: "/programming_1.mp4"
  },
  {
    title: "Feature 2",
    sub_text: "Another reason for picking us",
    video_src: "/programming_2.mp4"
  },
  {
    title: "Feature 3",
    sub_text: "One more reason for picking us",
    video_src: "/programming_3.mp4"
  },
]

function Features(){
  
  return (
    <div id="#features" className="bg-black text-white dark:bg-white dark:text-black py-24 border-y border-white/10 dark:border-black/10">
      <h2 className="text-3xl font-semibold mb-10 text-center">
        All of the control, with none of the friction
      </h2>

      <Carousel>
        <CarouselContent className="gap-6">
          {features_content.map((feature) => (
            <CarouselItem>  
              <FeatureItem
                sub_text={feature.sub_text} 
                title={feature.title}
                video_src={feature.video_src}
              />
            </CarouselItem>
          ))}


        </CarouselContent>
      </Carousel>
    </div>
  )
};

interface FeatureItemProps {
  title: string;
  video_src: string;
  sub_text: string;
}

function FeatureItem({ title, sub_text, video_src }: FeatureItemProps){
  return(
    <Card className="p-0 overflow-hidden bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10">
      <div className="grid md:grid-cols-2 min-h-[500px]">

        <div className="w-full h-full">
          <video
            src={video_src}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8">
          <h3 className="text-2xl font-bold mb-4 text-white dark:text-black">
            {title}
          </h3>
          <p className="text-white/70 dark:text-black/70">
            {sub_text}
          </p>
        </div>

      </div>
    </Card>
  )
}

export default Features;
