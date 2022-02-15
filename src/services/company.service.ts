import { getRepository } from "typeorm";
import Company from "../entities/company.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../errors/errorHandler.error";


export const createCompany = async (body: any) => {
    const companyRepository = getRepository(Company);
    
    const company = companyRepository.create({
        ...body,
        //todo: pegar o created by do middleware de validaçao de api_key
        createdBy: "926ed6ed-a9d7-4719-821b-1360675289a5"
    });

    return await companyRepository.save(company);
};

export const loginCompany = async (body: any) => {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne(
        {where: {
            email: body.email
        },
        select: ["password", "id"]
    });

    if (!company) {
        throw new ErrorHandler('wrong email', 401);
    } else if (!bcrypt.compareSync(body.password, company.password)) {
        throw new ErrorHandler('wrong password', 401);
    };
    
    const token = jwt.sign({ 
        id: company.id
    },
    process.env.JWT_SECRET as string, { 
        expiresIn: '24h' 
    });
    
    return token;
};

export const listCompanies = async () => {
    const companyRepository = getRepository(Company);

    const companies = await companyRepository.find();

    return companies;
};

export const findCompany = async (companyId: string) => {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne({
        where: {
            id: companyId
        }
    });

    if (!company) {
        throw new ErrorHandler('company not found', 404);
    }
    // if () {
    //     throw new ErrorHandler('missing admin permissions', 401);
    // };

    return company;
};

export const updateCompany = async (body: any, companyId: string) => {
    const companyRepository = getRepository(Company);

    const companyToUpdate = await companyRepository.findOne({
        where: {
            id: companyId
        }
    });

    if (!companyToUpdate) {
        throw new ErrorHandler('company not found', 404);
    } 
    // else if () {
    //     throw new ErrorHandler('missing admin permissions', 401);
    // };

    await companyRepository.update(companyId, {
        ...body
    });

    const updatedCompany = await companyRepository.findOne({
        where: {
            id: companyId
        }
    });

    return updatedCompany;
};

export const deleteCompany = async (companyId: string) => {
    const companyRepository = getRepository(Company);

    const companyToDelete = await companyRepository.findOne({
        where: {
            id: companyId
        }
    });

    if (!companyToDelete) {
        throw new ErrorHandler('company not found', 404);
    }
    // else if () {
    //     throw new ErrorHandler('missing admin permissions', 401);
    // };

    await companyRepository.delete(companyToDelete);
};