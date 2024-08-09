import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search } from "lucide-react";

const mockScrapeLinkedIn = async (company) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (company.toLowerCase() === 'invalid') {
    throw new Error('Company not found');
  }

  return [
    { title: 'Software Engineer', count: 50 },
    { title: 'Product Manager', count: 20 },
    { title: 'Data Scientist', count: 15 },
    { title: 'UX Designer', count: 10 },
    { title: 'Marketing Specialist', count: 25 },
  ];
};

const Index = () => {
  const [company, setCompany] = useState('');

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['linkedInScrape', company],
    queryFn: () => mockScrapeLinkedIn(company),
    enabled: false,
  });

  const handleSearch = () => {
    if (company.trim()) {
      refetch();
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">LinkedIn Employee Position Scraper</h1>
        
        <div className="flex space-x-2 mb-6">
          <Input
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {data && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Employee Positions at {company}</h2>
            <ul className="space-y-2">
              {data.map((position, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{position.title}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {position.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
