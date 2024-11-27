import { Article } from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  Query: {
    getListArticle: async (_, args) => {
      const { sortKey, sortValue } = args;

      // Sắp xếp
      const sort = {};

      if(sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      // Hết Sắp xếp

      const articles = await Article
        .find({
          deleted: false
        })
        .sort(sort);

      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;

      const article = await Article.findOne({
        _id: id,
        deleted: false
      });

      return article;
    },
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;
      
      const record = new Article(article);
      await record.save();

      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;

      await Article.updateOne({
        _id: id,
        deleted: false
      }, {
        deleted: true
      });

      return {
        code: "success",
        message: "Xóa thành công!"
      };
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;
      
      await Article.updateOne({
        _id: id,
        deleted: false
      }, article);

      const record = await Article.findOne({
        _id: id,
        deleted: false
      });

      return record;
    },
  },
  Article: {
    category: async (record) => {
      const categoryId = record.categoryId;

      const category = await Category.findOne({
        _id: categoryId,
        deleted: false
      });

      return category;
    }
  }
};