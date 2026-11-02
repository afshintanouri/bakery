import React from 'react';
import { Calendar, Clock, Check, Flame } from 'lucide-react';
import { DeliverySlot } from '../types/bakery';

interface BakeScheduleBarProps {
  slots: DeliverySlot[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
}

export const BakeScheduleBar: React.FC<BakeScheduleBarProps> = ({
  slots,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <section id="schedule" className="py-10 bg-[#F5EFEB] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            {/* Clean unboxed metadata with separators (§1.A) */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#7D6B5A] mb-1">
              <span>Bake & Delivery Calendar</span>
              <span aria-hidden="true">·</span>
              <span>Adelaide Foothills Morning Runs</span>
              <span aria-hidden="true">·</span>
              <span>Small-Batch Limit 45 Loaves / Day</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#201913] tracking-tight">
              Upcoming Hearth Bake Drops
            </h2>
            <p className="text-xs sm:text-sm text-[#615243] mt-1 max-w-2xl">
              Because true wild sourdough takes 36 hours from mixing to stone-deck baking, orders close at 5:00 PM two days prior. Select your delivery morning below:
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6F5E4E] bg-[#EBE2D4] px-3.5 py-2 rounded-lg border border-[#DECDB8] self-start md:self-auto shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#B85D19]" />
            <span>Porch Drop Window: <strong>7:00 AM – 10:30 AM</strong></span>
          </div>
        </div>

        {/* Schedule Grid with active state selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {slots.map((slot) => {
            const isSelected = selectedDate === slot.dateStr;
            const isLowSpots = slot.spotsRemaining <= 6;

            return (
              <button
                key={slot.dateStr}
                type="button"
                onClick={() => onSelectDate(slot.dateStr)}
                className={`flex flex-col justify-between p-3.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-[#2D241C] text-white border-[#2D241C] shadow-md ring-2 ring-[#B85D19]/40'
                    : 'bg-white hover:bg-[#FAF7F2] text-[#29221B] border-[#E3D6C5] hover:border-[#D1BFAB]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isSelected ? 'text-[#D6B58F]' : 'text-[#857361]'
                    }`}>
                      {slot.dayOfWeek}
                    </span>
                    {isSelected ? (
                      <span className="w-4 h-4 rounded-full bg-[#B85D19] flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    ) : (
                      <Calendar className="w-3.5 h-3.5 text-[#9E8E7E]" />
                    )}
                  </div>
                  
                  <div className={`font-display text-base font-semibold ${
                    isSelected ? 'text-[#FAF7F2]' : 'text-[#201913]'
                  }`}>
                    {slot.displayDate}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-dashed border-current/15 text-[11px]">
                  <div className={`flex items-center gap-1 font-medium ${
                    isSelected 
                      ? 'text-[#F1DCC2]' 
                      : isLowSpots 
                        ? 'text-[#B85D19]' 
                        : 'text-[#55764D]'
                  }`}>
                    {isLowSpots && <Flame className="w-3 h-3 shrink-0" />}
                    <span>{slot.spotsRemaining} spots left</span>
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${
                    isSelected ? 'text-[#BFAF9F]' : 'text-[#877868]'
                  }`}>
                    {slot.cutoffInfo.replace('Orders close ', '')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
