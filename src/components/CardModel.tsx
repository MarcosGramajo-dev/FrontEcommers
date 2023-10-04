import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  //  Avatar,
  } from "@material-tailwind/react";

export type product = {
  modelo: string,
  age: number,
  km: number,
  combustible: string,
  motor: string,
  idProduct: string,
  photos:[{public_id: string, secure_url:string}],
}

export default function CardModel(props: product){

  //const imgBG = `absolute inset-0 m-0 h-full w-full rounded-none bg-[url('${props.arrayPhotos[0].secure_url}')] bg-cover bg-center`
  const imgBG = props.photos[0].secure_url

  console.log(imgBG)
    return(
        <Card
      shadow={true}
      className="relative grid h-96 w-96 m-auto my-3 items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={true}
        shadow={true}
        color="transparent"
        className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-[url('${imgBG}')] bg-center`}
        //style={{ backgroundImage: `"url('${props.photos[0].secure_url}')"` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-7 px-6 md:px-12">
        <Typography variant="h2" color="white" className="mb-6 font-medium text-2xl leading-[1.5]" >
          {props.modelo} {props.age}
        </Typography>
        <Typography variant="h5" className="mb-4 text-lg text-gray-400">
          {props.km} {props.combustible} {props.motor}
        </Typography>
        {/* <Avatar
          size="xl"
          variant="circular"
          alt="tania andrew"
          className="border-2 border-white"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        /> */}
      </CardBody>
    </Card>
    )
}