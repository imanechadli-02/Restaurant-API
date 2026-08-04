/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common';


describe('CategoriesService', () => {


  let service: CategoriesService;


  // Mock du Repository TypeORM

  const mockRepository = {

    create: jest.fn(),

    save: jest.fn(),

    find: jest.fn(),

    findOne: jest.fn(),

    remove: jest.fn(),

  };



  beforeEach(async () => {


    const module: TestingModule =
      await Test.createTestingModule({

        providers: [

          CategoriesService,


          {
            provide: getRepositoryToken(Category),

            useValue: mockRepository,

          }

        ],

      }).compile();



    service =
      module.get<CategoriesService>(
        CategoriesService
      );


  });



  afterEach(()=>{

    jest.clearAllMocks();

  });




  // ==========================
  // TEST CREATE
  // ==========================


  describe('create',()=>{


    it('should create a category', async()=>{


      // Arrange

      const dto = {

        name:"Pizza",

        description:"Italian food"

      };


      const category = {

        id:1,

        name:"Pizza",

        description:"Italian food"

      };



      mockRepository.create
      .mockReturnValue(category);



      mockRepository.save
      .mockResolvedValue(category);



      // Act


      const result =
      await service.create(dto);



      // Assert


      expect(
        mockRepository.create
      )
      .toHaveBeenCalledWith(dto);



      expect(
        mockRepository.save
      )
      .toHaveBeenCalledWith(category);



      expect(result)
      .toEqual(category);


    });


  });




  // ==========================
  // TEST FIND ALL
  // ==========================


  describe('findAll',()=>{


    it('should return all categories', async()=>{


      // Arrange


      const categories = [

        {
          id:1,
          name:"Pizza",
          description:"Italian"
        },

        {
          id:2,
          name:"Burger",
          description:"Fast food"
        }

      ];



      mockRepository.find
      .mockResolvedValue(categories);



      // Act


      const result =
      await service.findAll();



      // Assert


      expect(
        mockRepository.find
      )
      .toHaveBeenCalled();



      expect(result)
      .toEqual(categories);


    });


  });




  // ==========================
  // TEST FIND ONE SUCCESS
  // ==========================


  describe('findOne',()=>{


    it('should return a category by id', async()=>{


      // Arrange


      const category = {

        id:1,

        name:"Pizza",

        description:"Italian"

      };


      mockRepository.findOne
      .mockResolvedValue(category);



      // Act


      const result =
      await service.findOne(1);



      // Assert


      expect(
        mockRepository.findOne
      )
      .toHaveBeenCalledWith({

        where:{
          id:1
        }

      });



      expect(result)
      .toEqual(category);



    });




    it('should throw NotFoundException if category does not exist',
      async()=>{


      // Arrange


      mockRepository.findOne
      .mockResolvedValue(null);



      // Act + Assert


      await expect(

        service.findOne(100)

      )
      .rejects
      .toThrow(NotFoundException);



    });


  });




  // ==========================
  // TEST UPDATE
  // ==========================


  describe('update',()=>{


    it('should update a category', async()=>{


      // Arrange


      const category = {

        id:1,

        name:"Pizza",

        description:"Old"

      };



      const dto = {

        name:"Pizza Updated",

        description:"New"

      };



      mockRepository.findOne
      .mockResolvedValue(category);



      mockRepository.save
      .mockResolvedValue({

        ...category,

        ...dto

      });



      // Act


      const result =
      await service.update(1,dto);



      // Assert


      expect(
        mockRepository.save
      )
      .toHaveBeenCalled();



      expect(result.description)
      .toBe("New");


    });


  });





  // ==========================
  // TEST REMOVE
  // ==========================


  describe('remove',()=>{


    it('should remove a category', async()=>{


      // Arrange


      const category = {

        id:1,

        name:"Pizza"

      };



      mockRepository.findOne
      .mockResolvedValue(category);



      mockRepository.remove
      .mockResolvedValue(category);



      // Act


      await service.remove(1);



      // Assert


      expect(
        mockRepository.remove
      )
      .toHaveBeenCalledWith(category);



    });



  });



});