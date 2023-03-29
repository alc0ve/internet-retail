const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  //   {
  //   include:[Product]
  // }).then(data => {
  //   res.json(data);
  // });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategoryById = await Category.findByPk(req.params.id, {
      include: [Product]
    });

    if (!oneCategoryById) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(oneCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createNewCategory = await Category.create(req.body);
    res.status(200).json(createNewCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategoryId = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategoryId) {
      res.status(404).json({ message: 'No category found with id!' });
      return;
    }

    res.status(200).json(deleteCategoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
