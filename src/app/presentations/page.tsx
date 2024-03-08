"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Lottie from "lottie-react";
import Animation from "../../../public/Animation.json";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import parse from "html-react-parser";

export default function ProductGen() {
  const { toast } = useToast();
  const [response, setResponse] = useState<any>();
  const [description, setDescription] = useState("");
  const [featureType, setFeatureType] = useState("");
  const [isGettingBlogInput, setIsGettingBlogInput] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isBlogGenerated, setIsBlogGenerated] = useState(false);
  const generatePresentatian = () => {
    setIsGettingBlogInput(false);
    setIsBlogLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LONGSHOT_KEY}`,
      },
      body:
        featureType === "shred"
          ? JSON.stringify({
              paragraph: description,
            })
          : JSON.stringify({
              text: description,
            }),
    };

    let url = "";
    if (featureType === "shred") {
      url = "https://api-v2.longshot.ai/custom/api/content/paragraph/shredder";
    } else if (featureType === "extend") {
      url = "https://api-v2.longshot.ai/custom/api/generate/extend/content";
    } else {
      url = "https://api-v2.longshot.ai/custom/api/content/rephrase";
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data);
        setIsBlogLoading(false);
        setIsBlogGenerated(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsBlogLoading(false);
      });
  };

  const copyBlog = () => {
    navigator.clipboard.writeText(response.copies[0].content);
    toast({
      title: "Copied!",
      description: `Your Product Copy has been copied successfully`,
    });
  };
  return (
    <div className="h-screen p-24">
      <h1 className="text-4xl font-bold">Present Perfect</h1>
      <p className="text-xl font-medium">Create the presentations you need</p>
      {isGettingBlogInput && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <div className="flex flex-col w-full items-start space-x-2 gap-2">
            <Label className="font-bold text-lg">Content</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your blog here"
            />
            <Button
              type="submit"
              className="w-full"
              onClick={() => generatePresentatian()}
            >
              Generate Presentation
            </Button>
          </div>
        </div>
      )}
      {isBlogLoading && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <Lottie animationData={Animation} loop={true} />
          <p>Your presentation is getting generated. This might take a while</p>
        </div>
      )}
      {isBlogGenerated && (
        <div className="my-4">
          <div className="max-w-3xl relative mx-auto">
            <div className="flex items-center gap-32">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setIsBlogGenerated(false);
                  setIsGettingBlogInput(true);
                }}
              >
                <ArrowLeft /> Back
              </Button>
              <p className="text-center">
                Your presentation has been generated successfully.
              </p>
            </div>
            <div className="border-sky-100 border rounded-lg my-4 p-8  max-h-[65vh] overflow-y-scroll">
              {response ? (
                <>{parse(response.copies[0].content)}</>
              ) : (
                <p>Unable to your Content</p>
              )}
            </div>
            <div className="flex items-center justify-end gap-8">
              <Button onClick={() => copyBlog()}>Copy</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
