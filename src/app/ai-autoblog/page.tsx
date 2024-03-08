"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import parse from "html-react-parser";

export default function AiBlog() {
  const { toast } = useToast();
  const [response, setResponse] = useState<any>();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [formality, setFormality] = useState("");
  const [tone, setTone] = useState("");
  const [isGettingBlogInput, setIsGettingBlogInput] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isBlogGenerated, setIsBlogGenerated] = useState(false);
  const [isStory, setIsStory] = useState(false);
  const generateBlog = () => {
    setIsGettingBlogInput(false);
    setIsBlogLoading(true);
    console.log(topic, tone, description, formality, isStory);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LONGSHOT_KEY}`,
      },
      body: JSON.stringify({
        topic: topic,
        description: description,
        blog_type: isStory ? "fantasy_story" : "listicle",
        mode: isStory ? "normal" : "serp",
        domain_list: [],
        formality: formality,
        tone: tone,
      }),
    };

    let url = isStory
      ? "https://api-v2.longshot.ai/custom/api/generate/one/click/specialized/blog"
      : "https://api-v2.longshot.ai/custom/api/generate/one/click/blog";

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
      description: `Your ${
        isStory ? "Story" : "Blog"
      } has been copied successfully`,
    });
  };
  return (
    <div className="h-screen p-24">
      <h1 className="text-4xl font-bold">
        AI Auto {isStory ? "Story" : "Blog"}
      </h1>
      <p className="text-xl font-medium">
        Generate {isStory ? "Story" : "Blog"}s with Longshot
      </p>
      {isGettingBlogInput && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <div className="flex flex-col w-full items-start space-x-2 gap-2">
            <Label className="font-bold text-lg">Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="High Speed Trains"
            />
            <Label className="font-bold text-lg">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how High Speed Trains are ecofriendly and helps to develop the nation"
            />
            <Label className="font-bold text-lg">Formality</Label>
            <Select value={formality} onValueChange={(e) => setFormality(e)}>
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select Formality of the ${
                    isStory ? "Story" : "Blog"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formality</SelectLabel>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label className="font-bold text-lg">Tone</Label>
            <Select value={tone} onValueChange={(e) => setTone(e)}>
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select Tone of the ${
                    isStory ? "Story" : "Blog"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tone</SelectLabel>
                  <SelectItem value="personable">Personable</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                  <SelectItem value="engaging">Engaging</SelectItem>
                  <SelectItem value="witty">Witty</SelectItem>
                  <SelectItem value="direct">Direct</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-2 my-1">
              <Switch
                checked={isStory}
                onCheckedChange={() => setIsStory(!isStory)}
              />
              <p className="text-sm">I&apos;m writing a Story</p>
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => generateBlog()}
            >
              Generate {isStory ? "Story" : "Blog"}
            </Button>
          </div>
        </div>
      )}
      {isBlogLoading && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <Lottie animationData={Animation} loop={true} />
          <p>
            Your {isStory ? "Story" : "Blog"} is getting generated. This might
            take a while
          </p>
        </div>
      )}
      {isBlogGenerated && (
        <div>
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
                Your {isStory ? "Story" : "Blog"} has been generated
                successfully.
              </p>
            </div>
            <div className="border-sky-100 border rounded-lg my-4 p-8  max-h-[65vh] overflow-y-scroll">
              {response ? (
                <>
                  {parse(response.copies[0].content)}
                  {response.citations && (
                    <>
                      <p className="font-bold mt-2">Citations: </p>
                      {response.citations.map(
                        (citation: any, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-700 p-2 rounded-lg mb-1"
                          >
                            <p>{citation.content}</p>
                            <a
                              href={citation.reference_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read more
                            </a>
                          </div>
                        )
                      )}
                    </>
                  )}
                </>
              ) : (
                <p>Unable to Generate {isStory ? "Story" : "Blog"}</p>
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
