import axios from 'axios';
import { useState } from 'react';
import { IMAGE_STRING } from "../../constant/imageString"

function ImageAiPage() {
  const [imageData, setImageData] = useState("");
  const [value, setValue] = useState("");

  const convertImage = () => {
    const payload = {
      "prompt": value,
      "negative_prompt": "smooth",
      "styles": ["normal"],
      "seed": -1,
      "subseed": -1,
      "subseed_strength": 0,
      "seed_resize_from_h": -1,
      "seed_resize_from_w": -1,
      "sampler_name": "DPM++ 2M Karras",
      "batch_size": 1,
      "n_iter": 1,
      "steps": 50,
      "cfg_scale": 7,
      "width": 512,
      "height": 512,
      "restore_faces": true,
      "tiling": true,
      "do_not_save_samples": false,
      "do_not_save_grid": false,
      "eta": 0,
      "denoising_strength": 0,
      "s_min_uncond": 0,
      "s_churn": 0,
      "s_tmax": 0,
      "s_tmin": 0,
      "s_noise": 0,
      "override_settings": {},
      "override_settings_restore_afterwards": true,
      "refiner_checkpoint": "v1-5-pruned-emaonly.safetensors [6ce0161689]",
      "refiner_switch_at": 0,
      "disable_extra_networks": false,
      "comments": {},
      "enable_hr": false,
      "firstphase_width": 0,
      "firstphase_height": 0,
      "hr_scale": 2,
      "hr_upscaler": "Latent",
      "hr_second_pass_steps": 0,
      "hr_resize_x": 0,
      "hr_resize_y": 0,
      "hr_checkpoint_name": "",
      "hr_sampler_name": "",
      "hr_prompt": "",
      "hr_negative_prompt": "",
      "sampler_index": "Euler",
      "script_name": "",
      "script_args": [],
      "send_images": true,
      "save_images": false,
      "alwayson_scripts": {}
    }
    const fetch = async () => {
      const response = await axios.post('http://127.0.0.1:7860/sdapi/v1/txt2img', payload)
      // const response = await axios.post('https://web3makers.animus.is/sdapi/v1/txt2img', payload)
      console.log(response.data);
      setImageData(response.data.images)

    }

    fetch()

  }

  var data = imageData ? imageData : IMAGE_STRING
  console.log("ImageData:", data)
  const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
  return (
    <div>
      {/* <form> */}
      <input type='text' value={value} onChange={(e) => { setValue(e.target.value) }}></input>
      <button onClick={convertImage}>Start AI Image</button>
      {/* </form> */}
      <br />
      <Example data={data} />
    </div>
  );
}

export default ImageAiPage;
