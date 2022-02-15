import { getRepository } from "typeorm";
import Company from "../entities/company.entity";


export const createCompany = async (body: any) => {
    const companyRepository = getRepository(Company);
    
    const company = companyRepository.create({
        ...body,
        //todo: pegar o created by do middleware de validaçao de api_key
        createdBy: "926ed6ed-a9d7-4719-821b-1360675289a5"
    });

    return await companyRepository.save(company);
};