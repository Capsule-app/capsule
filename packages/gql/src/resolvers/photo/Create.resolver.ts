import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Photo } from "../../entity/Photo";
import { hasSession, getUser } from "../../auth/session";
// import { s3 } from "../../index";
import { nanoid } from "nanoid";

@Resolver()
export default class CreatePhotoResolver {
  @Mutation(() => Photo)
  @UseMiddleware(hasSession)
  async createPhoto(
    @Ctx() context,
    @Arg("body") body: string,
    @Arg("name") name: string
  ): Promise<Photo> {
    const user = await getUser(context);

    if (!name.includes("."))
      throw new Error("file name must have an extension (.png)");

    if (!body) throw new Error("invalid body");

    const id = nanoid();

    // var decoded = Buffer.from(body, "base64");

    // const url = await s3
    //   .upload({
    //     Key: `${id}.${name.split(".")[1]}`,
    //     Bucket: process.env.AWS_BUCKET,
    //     Body: decoded,
    //     ContentEncoding: "base64",
    //     ContentType: `image/${name.split(".")[1]}`,
    //   })
    //   .promise()
    //   .then((data) => data.Location);

    const instance = await Photo.create({
      id,
      url: name,
      ownerId: user.id,
      createdAt: String(Date.now()),
    }).save();

    return instance;
  }
}
