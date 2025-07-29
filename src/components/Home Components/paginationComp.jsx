

import { Group, Pagination, Select } from '@mantine/core';

export default function PaginationComp(props){

    const { limit, setLimit, activePage, setActivePage } = props

    return(
        <>
            {/* Pagination and Select for items per page */}
            <Group gap={5} justify="center" mt="xl" mb="xl">
            
            <Pagination value={activePage} onChange={setActivePage} 
                total={Math.ceil(100/limit)} size="lg" radius="md" withEdges color="black" 
            />
            
            <Select
                value={limit}
                onChange={setLimit}
                placeholder="Select items per page"
                data={['10', '20', '30', '40', '50']}
            />  
            
            </Group>
        </>
    )
}