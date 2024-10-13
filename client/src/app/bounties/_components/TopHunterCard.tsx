import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TopHunterCard() {
    return (
        <Card className='border-[#d4d4d4] bg-white'>
              <CardHeader>
                <CardTitle className='text-lg font-bold text-[#303841]'>Top Hunters</CardTitle>
              </CardHeader>
              <CardContent>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-4 border-t border-[#d4d4d4] py-2 first:border-t-0 first:pt-0 last:pb-0'
                  >
                    <Avatar>
                      <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt='Hunter' />
                      <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium text-[#303841]'>Hunter Name</p>
                      <div className='flex items-center'>
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`h-3 w-3 ${starIndex < 4 ? 'fill-[#ff5722] text-[#ff5722]' : 'text-[#d4d4d4]'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
    );
}