"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [featureType, setFeatureType] = useState("");
  const [isGettingBlogInput, setIsGettingBlogInput] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isBlogGenerated, setIsBlogGenerated] = useState(false);
  const generateBlog = () => {
    setIsGettingBlogInput(false);
    setIsBlogLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LONGSHOT_KEY}`,
      },
      body: JSON.stringify({
        product,
        description,
        feature_type: featureType,
        serp: true,
        language: "en",
        phrases_to_exclude: [],
      }),
    };

    let url = "https://api-v2.longshot.ai/custom/api/generate/product/copies";

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
      <h1 className="text-4xl font-bold">Product Gen</h1>
      <p className="text-xl font-medium">
        For all your product needs
      </p>
      {isGettingBlogInput && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <div className="flex flex-col w-full items-start space-x-2 gap-2">
            <Label className="font-bold text-lg">Product</Label>
            <Textarea
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Google Pixel 8 is the latest smartphone launched by Google"
            />
            <Label className="font-bold text-lg">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Google Pixel 8 is the latest smartphone launched by Google"
            />
            <Label className="font-bold text-lg">Content Type</Label>
            <Select
              value={featureType}
              onValueChange={(e) => setFeatureType(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select the type of content`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="product_description">
                    Product Description
                  </SelectItem>
                  <SelectItem value="product_review">Product Review</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="w-full"
              onClick={() => generateBlog()}
            >
              Generate Product Content
            </Button>
          </div>
        </div>
      )}
      {isBlogLoading && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <Lottie animationData={Animation} loop={true} />
          <p>
            Your Product Content is getting generated. This might take a while
          </p>
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
                Your Product Content has been generated successfully.
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
