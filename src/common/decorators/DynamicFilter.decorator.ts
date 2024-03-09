import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { FindOptionsWhere } from 'typeorm';

interface Filter {
  name: string;
  value: string;
}

export type GenericFilter<T> = FindOptionsWhere<T>;

export type Filters = Filter[];

type FilterMapperCallback<T> = (filter: Filter) => FindOptionsWhere<T>;

interface FilteredRequest<T> extends Request {
  body: {
    filters: [];
  };
}

export const MappedFilters = <T>(mapper: FilterMapperCallback<T>) => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FilteredRequest<T>>();
    if (request.body && request.body.filters) {
      return request.body.filters.map(mapper);
    }
    return null;
  })();
};
