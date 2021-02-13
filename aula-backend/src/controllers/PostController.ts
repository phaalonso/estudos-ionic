import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import *  as Yup from 'yup';
import Post from "../models/Post";
import postView from "../views/post-view";

export default {
  async index(request: Request, response: Response) {
    const postRepository = getRepository(Post);

    const posts = await postRepository.find({
      relations: ["images"]
    });

    response.json(postView.renderMany(posts));
  },

  async show(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    console.log(id);
    const postRepository = getRepository(Post);

    const post = await postRepository.findOneOrFail(id, {
      relations: ["images"]
    });

    return response.json(postView.render(post));
  },

  async create(request: Request, response: Response, next: NextFunction) {
    //desestruturar o corpo da requisição (JSON)
    console.log(request.body);
    console.log(request.files);

    const { message } = request.body;

    const postRepository = getRepository(Post);

    const requestImagens = request.files as Express.Multer.File[];

    const images = requestImagens.map(image => {
      return { path: image.filename }
    });

    const data = {
      message,
      images
    }

    const schema = Yup.object().shape({
      message: Yup.string().required(),
      images: Yup.array().min(1)
    });

    await schema.validate(data, {
      abortEarly: false
    });

    const post = postRepository.create(data);

    await postRepository.save(post);

    return response.status(201).json(post);
  },
};