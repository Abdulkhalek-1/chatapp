import { Input } from "@/components/ui/input";
import SendIcon from "./components/SendIcon";
import { faImage, faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function Chat() {
  return (
    <>
      <div className="w-full h-20 fixed top-[100%] grid place-items-center">
        <div className="w-fit mx-auto h-fit gap-2 justify-center bottom-6">
          <Input
            placeholder="send a message!"
            className="w-full lg:w-[35rem]"
          />
          <SendIcon icon={faMicrophone} />
          <SendIcon icon={faImage} />
        </div>
      </div>
    </>
  );
}
